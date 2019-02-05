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
var develop = gitGraph.branch("develop-wave4");

// Commit on HEAD Branch which is "master"
develop.commit("Initial commit");

// Create feature from "develop"
var feature = develop.branch("feature/*")
feature.commit("feature/VFDE-XXX-*");

// Create a new "release" branch from "develop"
var release = develop.branch({
  name: "release/4.x",
});
release.commit("Creation of release/4.x branch");

var hotfix = release.branch({
  name: "hotfix/*"
})

// hotfix.commit('hotfix/fixed bug')
// release.checkout();
// hotfix.merge();

develop.checkout();
hotfix.merge();

hotfix.commit('hotfix/fixed bug');
feature.commit('feature/VFDE-XXX-*').commit('feature/VFDE-XXX-*').commit('feature/VFDE-XXX-*');

//merge feature into develop
develop.checkout();
feature.merge();

//merge hotfix into release
release.checkout();
hotfix.merge();

develop.checkout();
hotfix.merge();

feature.commit('feature/VFDE-XXX-*');
feature.merge();
