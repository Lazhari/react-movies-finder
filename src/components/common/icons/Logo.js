import React from "react";

const Logo = props => {
  return (
    <svg
      height={props.height || 91}
      viewBox="0 0 91 91"
      width={props.width || 91}
      {...props}
    >
      <path d="M34.726 45.278c.396-7.238-5.433-12.213-12.196-12.938-1.673-.18-2.747.783-3.191 2.052-4.006.523-7.455 5.337-7.939 9.01-.821 6.252 3.931 12.051 10.189 12.498 6.608.473 12.76-3.73 13.137-10.622zm-18.435-2.162c.491-2.268 2.013-3.57 3.637-4.823.567.704 1.432 1.172 2.603 1.152 3.407-.059 7.011 2.086 6.588 5.908-.448 4.012-4.919 5.766-8.544 4.856-2.998-.75-4.935-4.102-4.284-7.093zM49.289 43.402c-.818 6.252 3.932 12.051 10.189 12.498 6.607.473 12.758-3.73 13.139-10.623.396-7.238-5.434-12.213-12.199-12.938-1.672-.18-2.746.783-3.188 2.052-4.007.524-7.457 5.338-7.941 9.011zm17.721 1.951c-.449 4.012-4.922 5.766-8.545 4.856-2.998-.75-4.936-4.102-4.285-7.093.492-2.268 2.014-3.57 3.639-4.823.566.704 1.432 1.172 2.6 1.152 3.409-.059 7.013 2.086 6.591 5.908zM41.21 36.28c6.606.472 12.759-3.731 13.136-10.623.398-7.238-5.432-12.213-12.195-12.938-1.673-.18-2.747.782-3.191 2.051-4.004.523-7.455 5.338-7.939 9.01-.819 6.253 3.931 12.053 10.189 12.5zm-5.298-12.786c.491-2.268 2.015-3.57 3.639-4.823.567.704 1.432 1.172 2.601 1.152 3.409-.059 7.013 2.086 6.587 5.909-.445 4.014-4.916 5.766-8.542 4.856-2.999-.752-4.936-4.102-4.285-7.094zM41.474 51.285c-1.673-.18-2.745.781-3.189 2.051-4.006.523-7.457 5.338-7.941 9.012-.819 6.252 3.933 12.051 10.189 12.498 6.61.473 12.758-3.73 13.139-10.623.396-7.239-5.434-12.213-12.198-12.938zm6.59 13.012c-.447 4.014-4.919 5.768-8.545 4.855-2.999-.75-4.936-4.1-4.283-7.092.491-2.27 2.013-3.57 3.637-4.824.567.703 1.432 1.172 2.601 1.154 3.408-.06 7.014 2.085 6.59 5.907z" />
      <path d="M28.443 84.779c5.759 2 11.556 2.506 17.292 1.908.309.031.635.027.981-.031a54.757 54.757 0 002.566-.488c4.514-.82 8.979-2.27 13.338-4.176 6.561-2.867 12.512-6.92 17.428-12.133 4.838-5.129 7.344-11.098 10.424-17.313.477-.961-.967-1.813-1.445-.846-2.439 4.922-6.402 8.846-10.146 12.799-.453.48-.918.949-1.391 1.412 4.334-8.428 6.318-19.227 4.902-28.412-2.816-18.241-18.033-31.248-36.035-33.17-17.77-1.896-36.129 6.995-42.862 24.131C-1.084 40.113-.57 54.559 5.31 65.657c4.848 9.152 13.445 15.757 23.133 19.122zM7.089 38.134c2.559-15.768 15.699-27.132 31.549-28.026 17.226-.971 32.659 8.514 37.208 25.457.857 3.197.912 4.703.795 8.31-.189 6.007-1.223 12.11-3.771 17.595-5.264 11.328-15.887 17.135-27.913 18.803-1.019.143-1.683.639-2.049 1.297-2.214.057-4.416-.088-6.565-.5-8.214-1.574-15.998-5.697-21.569-11.982-7.418-8.369-9.442-20.143-7.685-30.954z" />
      <path d="M44.951 46.594c.571-.572 1.004-1.51.968-2.332-.082-1.788-1.45-3.299-3.299-3.299-.846 0-1.734.368-2.333.966-.573.572-1.003 1.511-.966 2.333.08 1.787 1.45 3.299 3.299 3.299.843 0 1.732-.37 2.331-.967z" />
    </svg>
  );
};

export default Logo;
