import { urlFor } from "@/app/(root)/blog/image";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const components = {
  types: {
    image: ({ value }: { value: SanityImageSource & { alt?: string } }) => {
      const imageUrl = urlFor(value)?.width(800).auto("format").url();
      if (!imageUrl) return null;
      return (
        <img
          src={imageUrl}
          alt={value.alt ?? "Blog image"}
          className="my-6 rounded-lg shadow-md"
        />
      );
    },

    table: ({ value }: any) => {
      if (!value?.rows || !value.rows.length) return null;
      return (
        <div className="overflow-x-auto my-6">
          <table className="table-auto w-full border border-gray-300 text-left">
            <tbody>
              {value.rows.map((row: any, rowIndex: number) => (
                <tr key={rowIndex} className="border-b border-gray-200">
                  {row.cells.map((cell: string, cellIndex: number) => (
                    <td
                      key={cellIndex}
                      className="p-2 border-r border-gray-200"
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    },

    cta: ({ value }: any) => {
      return (
        <div className="bg-rose-100 p-6 my-8 rounded-xl border-l-4 border-rose-500 shadow-sm">
          <h3 className="text-lg font-semibold mb-2">{value.heading}</h3>
          <p className="mb-4">{value.text}</p>
          {value.link && (
            <a
              href={value.link}
              className="inline-block bg-rose-500 text-white py-2 px-4 rounded hover:bg-rose-600"
            >
              {value.label || "Learn more"}
            </a>
          )}
        </div>
      );
    },
  },

  marks: {
    link: ({ children, value }: any) => {
      const isExternal = value?.href?.startsWith("http");
      return (
        <a
          href={value.href}
          className="text-blue-600 underline hover:text-blue-800"
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
        >
          {children}
        </a>
      );
    },
  },
};
