// Get references to page elements
var $expenseName = $("#expense-name");
var $submitBtn = $("#submit");
var $expenseList = $("#expense-list");

// The API object contains methods for each kind of request we'll make
var API = {
  saveExpense: function(tab) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/expenses",
      data: JSON.stringify(tab)
    });
  },
  getExpense: function() {
    return $.ajax({
      url: "api/expenses",
      type: "GET"
    });
  },
  deleteExpense: function(id) {
    return $.ajax({
      url: "api/expenses/" + id,
      type: "DELETE"
    });
  }
};

// refresh expenses gets new expenses from the db and repopulates the list
var refreshExpenses = function() {
    API.getExpense().then(function(data) {
      var $expenses = data.map(function(expense) {
        var $a = $("<a>")
          .text(expense.name)
          .attr("href", "/tab/" + expense.id);
  
        var $li = $("<li>")
          .attr({
            class: "list-group-item",
            "data-id": expense.id
          })
          .append($a);
  
        var $button = $("<button>")
          .addClass("btn btn-danger float-right delete")
          .text("ｘ");
  
        $li.append($button);
  
        return $li;
      });
  
      $expenseList.empty();
      $expenseList.append($expenses);
    });
};

// handleFormSubmit is called whenever we submit a new expense
// Save the new expense to the db and refresh the list
var handleFormSubmit = function(event) {
    event.preventDefault();
  
    var expense = {
      name: $expenseName.val().trim(),
    };
  
    if (!(expense.name)) {
      alert("You must enter an expense name!");
      return;
    }
  
    API.saveExpense(expense).then(function() {
      refreshExpenses();
    });
  
    $expenseName.val("");
};

// handleDeleteBtnClick is called when an expense's delete button is clicked
// Remove the expense from the db and refresh the list
var handleDeleteBtnClick = function() {
    var idToDelete = $(this)
      .parent()
      .attr("data-id");
  
    API.deleteExpense(idToDelete).then(function() {
      refreshExpenses();
    });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$tabList.on("click", ".delete", handleDeleteBtnClick);