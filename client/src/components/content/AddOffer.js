

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


  // needs a form with:
    // company name
      // dynamic search (like crunchbase)
    // salary (field type: number)
    // equity (type: number (percentage))
    // benefits (type: checkbox)
      // free lunch
      // free dinner
      // healthcare (with dental and eyes?)
      // (am i missing anything?)
    // extra benefits not yet accounted for (type: number)

    // note: in our formula to calculate the value of the offer, we should also include federal and state taxes
});

var PostOffer = React.createClass()



module.exports = {
  AddOffer: AddOffer
}
