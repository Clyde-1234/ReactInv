import React, { ReactNode } from "react";
import PropTypes from "prop-types";

interface SVGIconProps {
    width?: string | number;
    height?: string | number;
    className?: string;
    children?: ReactNode;
};

const SVGIcon: React.FC<SVGIconProps> = ({ width = '25', height = '25', className, children , ...props }) => {  // Default width/height
    return (
      <svg
        width={width}         
        height={height}       
        viewBox="0 0 24 24"   
        className={className} 
        {...props}           
      >
        {children}
      </svg>
    );
};

SVGIcon.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  className: PropTypes.string,
}
export default SVGIcon;