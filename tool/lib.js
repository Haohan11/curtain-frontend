import numeric from "numeric";

export const toArray = (target) => (Array.isArray(target) ? target : [target]);

export const transImageUrl = (path) =>
  typeof path === "string"
    ? `${process.env.NEXT_PUBLIC_BACKENDURL}${path.replace(/\\/g, "/")}`
    : "";

export const onlyNumber = (event) => {
  if (
    /^\d$/.test(event.key) ||
    [
      "Backspace",
      "Delete",
      "Escape",
      "Tab",
      "ArrowLeft",
      "ArrowRight",
      "Home",
      "End",
      "Enter",
    ].includes(event.key) ||
    (event.ctrlKey && ["a", "x", "c", "v"].includes(event.key))
  )
    return;
  event.preventDefault();
};

export const toFormData = (values) => {
  const formData = new FormData();
  for (const key in values) {
    const value = values[key];
    if (!Array.isArray(value)) {
      formData.append(key, value);
      continue;
    }

    value.forEach((item) => {
      formData.append(
        key,
        typeof item === "object" && !(item instanceof File)
          ? JSON.stringify(item)
          : item
      );
    });
  }
  return formData;
};

// return true ==> isExpire
export const checkExpires = (time) => {
  return !isNaN(time) && time * 1000 < Date.now();
};

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const validateEmail = (email) => emailRegex.test(email);

export const checkShowMode = (router) => {
  return (
    !["true", "false"].includes(router?.query?.showMode) ||
    JSON.parse(router.query.showMode)
  );
};

const getTransform = function (from, to) {
  const A = [];
  for (let i = 0, k = 0; k < 4; i = ++k) {
    A.push([
      from[i].x,
      from[i].y,
      1,
      0,
      0,
      0,
      -from[i].x * to[i].x,
      -from[i].y * to[i].x,
    ]);
    A.push([
      0,
      0,
      0,
      from[i].x,
      from[i].y,
      1,
      -from[i].x * to[i].y,
      -from[i].y * to[i].y,
    ]);
  }
  const b = [];
  for (let i = 0, l = 0; l < 4; i = ++l) {
    b.push(to[i].x);
    b.push(to[i].y);
  }
  const h = numeric.solve(A, b);
  const H = [
    [h[0], h[1], 0, h[2]],
    [h[3], h[4], 0, h[5]],
    [0, 0, 1, 0],
    [h[6], h[7], 0, 1],
  ];
  for (let i = 0, m = 0; m < 4; i = ++m) {
    const lhs = numeric.dot(H, [from[i].x, from[i].y, 0, 1]);
    const k_i = lhs[3];
    const rhs = numeric.dot(k_i, [to[i].x, to[i].y, 0, 1]);
    console.assert(
      numeric.norm2(numeric.sub(lhs, rhs)) < 1e-9,
      "Not equal:",
      lhs,
      rhs
    );
  }
  return H;
};

export const getMatirx3dText = function (originalPos, targetPos) {
  const from = (function () {
    const results = [];
    for (let k = 0, len = originalPos.length; k < len; k++) {
      const p = originalPos[k];
      results.push({
        x: p[0] - originalPos[0][0],
        y: p[1] - originalPos[0][1],
      });
    }
    return results;
  })();
  const to = (function () {
    const results = [];
    for (let k = 0, len = targetPos.length; k < len; k++) {
      const p = targetPos[k];
      results.push({
        x: p[0] - originalPos[0][0],
        y: p[1] - originalPos[0][1],
      });
    }
    return results;
  })();
  const H = getTransform(from, to);

  return (
    "matrix3d(" +
    (function () {
      const results = [];
      for (let i = 0, k = 0; k < 4; i = ++k) {
        results.push(
          (function () {
            const results1 = [];
            for (let j = 0, l = 0; l < 4; j = ++l) {
              results1.push(H[j][i].toFixed(20));
            }
            return results1;
          })()
        );
      }
      return results;
    })().join(",") +
    ")"
  );
};

export const isJson = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export const getAddPadding = (() => {
  const checkType = (target) => {
    const type = typeof target;
    if (type === "string") return true;
    throw Error(`addPadding only accept string input but get "${type}" type.`);
  };

  return (symbol) => {
    checkType(symbol);

    return (str, digits) => {
      checkType(str);
      while (str.length < digits) str = symbol + str;
      return str;
    };
  };
})();

export const addZeroPadding = getAddPadding("0");

export const getCurrentTime = () => {
  const date = new Date();
  const month = addZeroPadding(`${date.getMonth() + 1}`, 2);
  const day = addZeroPadding(`${date.getDate()}`, 2);
  const hour = addZeroPadding(`${date.getHours()}`, 2);
  const minute = addZeroPadding(`${date.getMinutes()}`, 2);
  const second = addZeroPadding(`${date.getSeconds()}`, 2);

  return `${date.getFullYear()}-${month}-${day} ${hour}:${minute}:${second}`;
};
