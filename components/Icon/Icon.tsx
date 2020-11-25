import { useEffect, useState, useRef, FC, SVGProps } from "react";

interface IconProps extends SVGProps<SVGSVGElement> {
  name: string;
}

export const Icon: React.FC<IconProps> = ({ name, ...rest }) => {
  const ImportedIconRef = useRef<FC<React.SVGProps<SVGSVGElement>>>();
  const [loading, setLoading] = useState(false);

  const icons = {
    plus: import("assets/icons/ic-plus.svg"),
    search: import("assets/icons/ic-search.svg"),
    edit: import("assets/icons/ic-edit.svg"),
    delete: import("assets/icons/ic-delete.svg"),
  };

  useEffect((): void => {
    setLoading(true);
    const importIcon = async (): Promise<void> => {
      try {
        ImportedIconRef.current = (await icons[name]).ReactComponent;
      } catch (err) {
        throw err;
      } finally {
        setLoading(false);
      }
    };
    importIcon();
  }, [name]);

  if (!loading && ImportedIconRef.current) {
    const { current: ImportedIcon } = ImportedIconRef;
    return <ImportedIcon {...rest} />;
  }

  return null;
};
