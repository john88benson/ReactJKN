var contacts = [
    {key: 1, name: "John C Benson", email: "jbenson@withum.com", description: "Just Another Developer"},
    {key: 2, name: "Robert A Shaw", email: "rshaw@example.com"},
    {key: 3, name: "Bobby Tables"},
    {key: 4, name: "Isaac Asimov", email: "iasimov@trantor.gov", description: "One of the Big Three"}
]

var ContactItem = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        email: React.PropTypes.string.isRequired,
        description: React.PropTypes.string,
    },

    render: function(){
        return(
            React.createElement('li', {},
                React.createElement('h2', {}, this.props.name),
                React.createElement('a', {href: 'mailto:'+this.props.email}, this.props.email),
                React.createElement('div', {}, this.props.description)
            )
        )
    },
})

var contactItemElements = contacts
    .filter(function(contact){ return contact.email})
    .map(function(contact) { return React.createElement(ContactItem, contact)})

var rootElement = 
    React.createElement('div', {},
        React.createElement('h1', {}, "Contacts"),
        React.createElement('ul', {}, contactItemElements)
    )

ReactDOM.render(rootElement, document.getElementById('react-app'))