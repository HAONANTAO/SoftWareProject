import React from "react";

import ModuleDetails from "../../../../components/ModuleDetails/ModuleDetails";
import ModuleOverview from "../../../../components/ModuleOverview/ModuleOverview";

import "./ModuleView.less";
function ModuleView() {
  return (
    <div className="module-view">
      <ModuleOverview></ModuleOverview>
      <ModuleDetails></ModuleDetails>
    </div>
  );
}

export default ModuleView;
