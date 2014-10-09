/**
 * @jsx React.DOM
 */
//= require react

var LearnMore = React.createClass({
  render: function() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-8 col-md-offset-2">
            <div className="page">
            <p><b>Thank you for your business!</b></p>
            <h5>General Details:</h5>
            <ul>
              <li>
                All clients will be charged a $30 container fee the first time you order. This covers the glass containers and cooler bags. The next time you order, just return the glass containers and we will sterilize and reuse them. sectionlease return your containers clean.
              </li>

              <li>
                What we’re calling a meal is one portion of a main dish and one portion of a side dish. Generally, this is a 16 oz. serving of the main and an 8 oz. serving of the side. Each dish comes in a container of 2 servings.
              </li>
              <li>
                You are welcome to mix and match your orders, or order multiples of your favorite dishes.
                Meals come fully cooked and ready to heat. They are not frozen.
                You will receive the pre-selected menu unless you choose different dishes before the ordering cutoff time.
              </li>
              <li>
                Weekly Pricing - If you order by the week, there is a $15 delivery fee included in your total.
              </li>
            </ul>

            <h5>Packages:</h5>
            <ul>
              <li>
                12 Meals - This is a great option for larger families, or if you’re wanting to eat our food for most of the week. If you’re going with this option, you will be prompted to choose 6 mains and 6 sides. Important - If you’re feeding a family of four, you need to choose each item twice to get 4 servings of each thing.
              </li>
              <li>
                If you purchase a 12 week package, you save on the weekly price, and the delivery fee is waived.
              </li>
              <li>
                If you’re going to be out of town, just let us know by the ordering cutoff date, and your subscription will be put on hold for that time. If you don’t let us know by the cutoff date, you will get food that week. (Or we will donate it to someone in need.)
              </li>
              <li>
                If for some reason, you need to cancel your 12 week package, we refund the unused portion at the weekly rate, including delivery fee.
              </li>
            </ul>
            <h5>Ingredients:</h5>
            <ul>
              <li>
                We’re totally committed to using all organic ingredients. We do source some ingredients from trusted farmers that aren’t certified organic, but are no spray. For clarity, we put an asterisk next to all of the certified organic ingredients.
              </li>
              <li>
                Our favorite salt is the Redmond RealSalt. It’s mineral rich, and comes from Utah.
              </li>
              <li>
                Gluten-Free - We cook without using wheat or gluten products, but we aren’t cooking in a GF facility.
              </li>
              <li>
                All of our food is dairy-free unless it is clearly marked with an option to add cheese.
              </li>
              <li>
                We never use additives like sweeteners or MSG.
              </li>
            </ul>
            <p><b>Thanks again and we look forward to serving you!</b></p>
            </div>
          </div>
        </div>
      </div>
    );
  }

});
