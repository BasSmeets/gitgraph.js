/***********************
 *  CUSTOM TEMPLATES   *
 ***********************/

var myTemplateConfig = {
  colors: ["#F00", "#0F0", "#00F"], // branches colors, 1 per column
  branch: {
    lineWidth: 8,
    // Dash segments, see:
    // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash
    lineDash: [5, 3],
    spacingX: 50
  },
  commit: {
    spacingY: -80,
    dot: {
      size: 12,
      lineDash: [4]
    },
    message: {
      displayAuthor: true,
      displayBranch: false,
      displayHash: false,
      font: "normal 12pt Arial"
    },
    shouldDisplayTooltipsInCompactMode: false, // default = true
    tooltipHTMLFormatter: function (commit) {
      return "<b>" + commit.sha1 + "</b>" + ": " + commit.message;
    }
  }
};
var myTemplate = new GitGraph.Template(myTemplateConfig);

/***********************
 *    INITIALIZATION   *
 ***********************/

var config = {
  template: "blackarrow", // could be: "blackarrow" or "metro" or `myTemplate` (custom Template object)
  reverseArrow: false, // to make arrows point to ancestors, if displayed
  orientation: "vertical",
  // mode: "compact" // special compact mode: hide messages & compact graph
};
var gitGraph = new GitGraph(config);

/************************
 * BRANCHES AND COMMITS *
 ************************/

// Create branch named "master"
var develop = gitGraph.branch("develop-wave4.3");
var release = gitGraph.branch("release/4.15.0");

// Commit on HEAD Branch which is "master"
develop.commit("Initial commit");
release.commit("Initial commit");

// Create developftcr from "release"
var developftcr = release.branch("develop-wave4FTCR")
developftcr.commit("feature/VFDED1FTS-123-*");
develop.commit("feature/VFDED1FTS-123-*");
developftcr.commit("feature/VFDED1FTS-124-*");
develop.commit("feature/VFDED1FTS-124-*");
developftcr.commit("feature/VFDED1FTS-125-*");
develop.commit("feature/VFDED1FTS-125-*");

// Create a new "release" branch from "develop"
var releaseftcr = developftcr.branch({
  name: "release/4.15.0-ftcr",
});

releaseftcr.commit({
  message: "Creation of release/4.15.1-ftcr",
  tag: "tagged 4.15.1-ftcr",
  displayTagBox: true
});
