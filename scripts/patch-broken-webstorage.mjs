function createMemoryStorage() {
  const store = new Map();

  return {
    get length() {
      return store.size;
    },
    clear() {
      store.clear();
    },
    getItem(key) {
      const normalizedKey = String(key);
      return store.has(normalizedKey) ? store.get(normalizedKey) : null;
    },
    key(index) {
      return Array.from(store.keys())[index] ?? null;
    },
    removeItem(key) {
      store.delete(String(key));
    },
    setItem(key, value) {
      store.set(String(key), String(value));
    },
  };
}

function hasStorageMethods(storage) {
  return Boolean(
    storage &&
      typeof storage.getItem === "function" &&
      typeof storage.setItem === "function" &&
      typeof storage.removeItem === "function" &&
      typeof storage.clear === "function" &&
      typeof storage.key === "function"
  );
}

function ensureStorage(name) {
  const descriptor = Object.getOwnPropertyDescriptor(globalThis, name);

  if (descriptor && "value" in descriptor && hasStorageMethods(descriptor.value)) {
    return;
  }

  Object.defineProperty(globalThis, name, {
    configurable: true,
    enumerable: true,
    writable: true,
    value: createMemoryStorage(),
  });
}

ensureStorage("localStorage");
ensureStorage("sessionStorage");
