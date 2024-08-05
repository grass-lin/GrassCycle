import React from "react";
import { Button } from "antd";

const SubButton = ({ isAllowEdit }) => {
  if (isAllowEdit) {
    return <Button>保存更改</Button>;
  } else {
    return <></>;
  }
};

export default SubButton;
