

// POST request to server with all info listed above
// update tables: users, offers, companies

// GET request for metrics about the offer
// so we can display the offer results on the page

var AddOffer = React.createClass({

  render: function() {
    return (
      <form className="offerForm">
        Startup: <input type="text" placeholder="Which Startup?" />
        Salary: <input type="number" />
        Equity: <input type="number" />
        Benefits: 
          <input type="checkbox" name="food" />Free Food
          <input type="checkbox" name="healthcare" />Free Healthcare
        Other Benefits: <input type="number" />
        <input type="submit" value="Post" />
      </form>
    )
  }
});

// var PostOffer = React.createClass()

    // note: in our formula to calculate the value of the offer, we should also include federal and state taxes


module.exports = {
  AddOffer: AddOffer
}
