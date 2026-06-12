function createMemoryStorage() {
  const store = new Map<string, string>();

  return {
    get length() {
      return store.size;
    },
    clear() {
      store.clear();
    },
    getItem(key: string) {
      return store.has(key) ? store.get(key)! : null;
    },
    key(index: number) {
      return Array.from(store.keys())[index] ?? null;
    },
    removeItem(key: string) {
      store.delete(key);
    },
    setItem(key: string, value: string) {
      store.set(key, value);
    },
  };
}

function hasStorageMethods(storage: unknown): storage is Storage {
  if (!storage || typeof storage !== "object") {
    return false;
  }

  const candidate = storage as Partial<Storage>;

  return (
    typeof candidate.getItem === "function" &&
    typeof candidate.setItem === "function" &&
    typeof candidate.removeItem === "function" &&
    typeof candidate.clear === "function" &&
    typeof candidate.key === "function"
  );
}

function ensureStorage(name: "localStorage" | "sessionStorage") {
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
