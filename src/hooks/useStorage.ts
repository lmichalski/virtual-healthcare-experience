//////////////////////////////////////////////////
// Cookies + State, it's messy here
//////////////////////////////////////////////////

var maxAge = 21 * 24 * 60;

function isLocalStorageAvailable() {
  var str = "test";
  try {
    localStorage.setItem(str, str);
    localStorage.removeItem(str);
    return true;
  } catch (e) {
    return false;
  }
}

const cookies = {
  put(key: string, value: string, maxAge: number) {
    var cookie = `${key}=${value};path=/;max-age=${maxAge};`;
    console.log(cookie);
    document.cookie = cookie;
  },
  get(cname: string): string | null {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return null;
  },
  remove(key: string) {
    this.put(key, "", -1);
  },
};

export const VHEStorage = {
  set: function (key: string, value: string) {
    if (isLocalStorageAvailable()) {
      window.localStorage.setItem(key, value);
    } else {
      cookies.put(key, value, maxAge);
    }
  },
  get: function (key: string): string | null {
    var r = isLocalStorageAvailable()
      ? window.localStorage.getItem(key)
      : cookies.get(key);
    return r;
  },
  setObject: function (key: string, value: any) {
    const o = JSON.stringify(value);
    if (isLocalStorageAvailable()) {
      window.localStorage.setItem(key, o);
    } else {
      cookies.put(key, o, maxAge);
    }
  },
  getObject: function (key: string) {
    var r = isLocalStorageAvailable()
      ? window.localStorage.getItem(key)
      : cookies.get(key);
    return r ? JSON.parse(r) : false;
  },
  remove: function (key: string) {
    if (isLocalStorageAvailable()) {
      window.localStorage.removeItem(key);
    } else {
      cookies.remove(key);
    }
  },
};

const useStorage = () => {
    return VHEStorage
}

export default useStorage