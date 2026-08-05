export const primaryNavigation = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/products", label: "Products" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const footerCategoryNavigation = [
  { href: "/categories/fashion", label: "Fashion" },
  { href: "/categories/haircare", label: "Hair Care" },
  { href: "/categories/skincare", label: "Skin Care" },
  { href: "/categories/wellness", label: "Wellness" },
  { href: "/categories/lifestyle", label: "Lifestyle" },
] as const;

export const footerQuickLinks = [
  { href: "/about", label: "About Us" },
  { href: "/blog", label: "Blog" },
  { href: "/products", label: "Products" },
  { href: "/shop", label: "Shop" },
  { href: "/contact", label: "Contact" },
] as const;

export function isPrimaryNavigationActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}
