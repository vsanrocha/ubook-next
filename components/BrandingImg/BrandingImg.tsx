import { FC } from "react";
import { ReactComponent as IcLogo } from "assets/img/ic-logo.svg";

type BrandingImgProps = {
  className: string
}

export const BrandingImg:FC<BrandingImgProps> = ({className}) => {
  return (
    <div className={className}>
      <IcLogo />
    </div>
  );
};
