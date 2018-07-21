// Get references to page elements
var $tabName = $("#tab-name");
var $submitBtn = $("#submit");
var $tabList = $("#tab-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveTab: function(tab) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/tabs",
      data: JSON.stringify(tab)
    });
  },
  getTab: function() {
    return $.ajax({
      url: "api/tabs",
      type: "GET"
    });
  },
  deleteTab: function(id) {
    return $.ajax({
      url: "api/tabs/" + id,
      type: "DELETE"
    });
  }
};

// refreshTabs gets new tabs from the db and repopulates the list
var refreshTabs = function() {
  API.getTab().then(function(data) {
    var $tabs = data.map(function(tab) {
      var $a = $("<a>")
        .text(tab.name)
        .attr("href", "/tab/" + tab.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": tab.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $tabList.empty();
    $tabList.append($tabs);
  });
};

// handleFormSubmit is called whenever we submit a new tab
// Save the new tab to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var tab = {
    name: $tabName.val().trim(),
  };

  if (!(tab.name)) {
    alert("You must enter an Tab name!");
    return;
  }

  API.saveTab(tab).then(function() {
    refreshTabs();
  });

  $tabName.val("");
};

// handleDeleteBtnClick is called when an tab's delete button is clicked
// Remove the tab from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteTab(idToDelete).then(function() {
    refreshTabs();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$tabList.on("click", ".delete", handleDeleteBtnClick);
