/* eslint-disable prefer-template */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-param-reassign */
/* eslint-disable no-use-before-define */
/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

export const authHeader = () => {
  const token = getCookie("access_token");
  if (token) {
    return { Authorization: `Bearer ${token}` };
  }
  return {};
};

export const countPaginationPages = (total, perPage) => {
  return Math.ceil(total / perPage);
};

export const customFetch = (uri, options) => {
  if (options.useUpload) {
    return uploadFetch(uri, options);
  }
  return fetch(uri, options);
};

export const deepClone = (variable) => {
  if (!variable) throw new Error("Invalid variable to clone to");
  return JSON.parse(JSON.stringify(variable));
};

export const deleteCookie = (cookieName) => {
  document.cookie = `${cookieName}= ; expires = Thu, 01 Jan 1970 00:00:00 UTC; path=/`;
};

export const ellipsis = (text, charLength) => {
  if (text && charLength && text.length > charLength) {
    text = text.substring(0, charLength);
    text = text.concat("...");
  }
  return text;
};

export const getCookie = (cookieName) => {
  const cookieString = document.cookie;

  if (cookieString.length !== 0) {
    const re = new RegExp(`(^|;)[\\s]*${cookieName}=([^;]*)`);
    const cookieValue = cookieString.match(re);

    if (cookieValue !== undefined && cookieValue !== null) {
      return decodeURIComponent(cookieValue[2]);
    }
    return "";
  }

  return "";
};

export const logIn = () => {
  console.log("Loggin in ...");
};

export const logOut = () => {
  deleteCookie("access_token");
  deleteCookie("role");
};

export const modifySelectedMediaPath = (fileName, path) => {
  let filePath = deepClone(path);
  filePath[filePath.length - 1] === "&gt;"
    ? (filePath += fileName)
    : (filePath += `&gt;${fileName}`);

  return filePath;
};

export const uploadFetch = (url, options) =>
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = () => {
      const opts = {
        status: xhr.status,
        statusText: xhr.statusText,
        headers: parseHeaders(xhr.getAllResponseHeaders() || ""),
      };
      opts.url =
        "responseURL" in xhr
          ? xhr.responseURL
          : opts.headers.get("X-Request-URL");
      const body = "response" in xhr ? xhr.response : xhr.responseText;
      resolve(new Response(body, opts));
    };
    xhr.onerror = () => {
      reject(new TypeError("Network request failed"));
    };
    xhr.ontimeout = () => {
      reject(new TypeError("Network request failed"));
    };
    xhr.open(options.method, url, true);

    Object.keys(options.headers).forEach((key) => {
      xhr.setRequestHeader(key, options.headers[key]);
    });

    if (xhr.upload) {
      xhr.upload.onprogress = options.onProgress;
    }

    options.onAbortPossible(() => {
      xhr.abort();
    });

    xhr.send(options.body);
  });

export const useOuterClick = (callback) => {
  const innerRef = useRef();
  const callbackRef = useRef();

  function handleClick(e) {
    if (
      innerRef.current &&
      callbackRef.current &&
      !innerRef.current.contains(e.target)
    ) {
      callbackRef.current(e);
    }
  }

  useEffect(() => {
    callbackRef.current = callback;
  });

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return innerRef;
};

export const parseHeaders = (rawHeaders) => {
  const headers = new Headers();
  // Replace instances of \r\n and \n followed by at least one space or horizontal tab with a space
  // https://tools.ietf.org/html/rfc7230#section-3.2
  const preProcessedHeaders = rawHeaders.replace(/\r?\n[\t ]+/g, " ");
  preProcessedHeaders.split(/\r?\n/).forEach((line) => {
    const parts = line.split(":");
    const key = parts.shift().trim();
    if (key) {
      const value = parts.join(":").trim();
      headers.append(key, value);
    }
  });
  return headers;
};

export const paginationSteps = (allRecordsCount) => [
  { id: 1, value: 10 },
  { id: 2, value: 15 },
  { id: 3, value: 20 },
  { id: 4, value: 25 },
  { id: 5, value: 30 },
  { id: 6, value: allRecordsCount },
];

export const setCookie = (name, value, days) => {
  const d = new Date();
  d.setTime(d.getTime() + days * 24 * 60 * 60);
  d.toUTCString();
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(
    value
  )}; expires="${d}; path=/"`;
};

export const showPasswordIconStyles = (marginLeft, marginRight, marginTop) => {
  const width = window.innerWidth;
  let styles;

  if (width <= 450) {
    styles = {
      height: "30px",
      width: "30px",
      "vertical-align": "center",
      border: "none",
      "background-color": "white",
      "margin-top": marginTop,
      "margin-right": "7%",
      position: "absolute",
      right: "0",
    };
  }

  if (width > 450 && width <= 768) {
    styles = {
      height: "30px",
      width: "30px",
      "vertical-align": "center",
      border: "none",
      "background-color": "white",
      "margin-top": marginTop,
      "margin-left": "370px",
      position: "absolute",
    };
  }

  if (width > 768 && width <= 860) {
    styles = {
      height: "30px",
      width: "30px",
      "vertical-align": "center",
      border: "none",
      "background-color": "white",
      position: "absolute",
      "margin-top": marginTop,
      "margin-left": marginLeft,
    };
  }

  if (width > 860) {
    styles = {
      width: "30px",
      height: "30px",
      "vertical-align": "center",
      border: "none",
      "background-color": "white",
      position: "absolute",
      "margin-top": marginTop,
      "margin-left": "370px",
    };
  }

  return styles;
};

export const showFollowersNumber = (followers) => {
  const million = 1000000;
  const thousand = 1000;

  let followersNumber;

  if (followers > million) {
    followersNumber = `${parseFloat(followers / million).toFixed(1)}M`;
  } else if (followers > thousand) {
    followersNumber = `${parseFloat(followers / thousand).toFixed(1)}K`;
  } else {
    followersNumber = followers;
  }
  return followersNumber;
};

export const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  const isMobile = width <= 768;
  return {
    width,
    height,
    isMobile,
  };
};

export const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
};
