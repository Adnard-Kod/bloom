/**
 * @jsx React.DOM
 */
//= require react

var LearnMore = React.createClass({displayName: 'LearnMore',
  render: function() {
    return (
      React.DOM.div({className: "container-fluid"},
        React.DOM.div({className: "row"},
          React.DOM.div({className: "col-lg-8 col-md-offset-2"},
            React.DOM.div({className: "page"},
            React.DOM.p(null, React.DOM.b(null, "Thank you for your business!")),
            React.DOM.h5(null, "General Details:"),
            React.DOM.ul(null,
              React.DOM.li(null,
                "All clients will be charged a $30 container fee the first time you order. This covers the glass containers and cooler bags. The next time you order, just return the glass containers and we will sterilize and reuse them. sectionlease return your containers clean."
              ),

              React.DOM.li(null,
                "What we’re calling a meal is one portion of a main dish and one portion of a side dish. Generally, this is a 16 oz. serving of the main and an 8 oz. serving of the side. Each dish comes in a container of 2 servings."
              ),
              React.DOM.li(null,
                "You are welcome to mix and match your orders, or order multiples of your favorite dishes." + ' ' +
                "Meals come fully cooked and ready to heat. They are not frozen." + ' ' +
                "You will receive the pre-selected menu unless you choose different dishes before the ordering cutoff time."
              ),
              React.DOM.li(null,
                "Weekly Pricing - If you order by the week, there is a $15 delivery fee included in your total."
              )
            ),

            React.DOM.h5(null, "Packages:"),
            React.DOM.ul(null,
              React.DOM.li(null,
                "12 Meals - This is a great option for larger families, or if you’re wanting to eat our food for most of the week. If you’re going with this option, you will be prompted to choose 6 mains and 6 sides. Important - If you’re feeding a family of four, you need to choose each item twice to get 4 servings of each thing."
              ),
              React.DOM.li(null,
                "If you purchase a 12 week package, you save on the weekly price, and the delivery fee is waived."
              ),
              React.DOM.li(null,
                "If you’re going to be out of town, just let us know by the ordering cutoff date, and your subscription will be put on hold for that time. If you don’t let us know by the cutoff date, you will get food that week. (Or we will donate it to someone in need.)"
              ),
              React.DOM.li(null,
                "If for some reason, you need to cancel your 12 week package, we refund the unused portion at the weekly rate, including delivery fee."
              )
            ),
            React.DOM.h5(null, "Ingredients:"),
            React.DOM.ul(null,
              React.DOM.li(null,
                "We’re totally committed to using all organic ingredients. We do source some ingredients from trusted farmers that aren’t certified organic, but are no spray. For clarity, we put an asterisk next to all of the certified organic ingredients."
              ),
              React.DOM.li(null,
                "Our favorite salt is the Redmond RealSalt. It’s mineral rich, and comes from Utah."
              ),
              React.DOM.li(null,
                "Gluten-Free - We cook without using wheat or gluten products, but we aren’t cooking in a GF facility."
              ),
              React.DOM.li(null,
                "All of our food is dairy-free unless it is clearly marked with an option to add cheese."
              ),
              React.DOM.li(null,
                "We never use additives like sweeteners or MSG."
              )
            ),
            React.DOM.p(null, React.DOM.b(null, "Thanks again and we look forward to serving you!"))
            )
          )
        )
      )
    );
  }

});
