var ContactForm = React.createClass({
    propTypes: {
        value: React.PropTypes.object.isRequired,
        onChange: React.PropTypes.func.isRequired,
        onSubmit: React.PropTypes.func.isRequired,
    },
    onNameChange: function(e){
        this.props.onChange(Object.assign({}, this.props.value, {name: e.target.value}));
    },
    onEmailChange: function(e){
        this.props.onChange(Object.assign({}, this.props.value, {email: e.target.value}));
    },
    onDescriptionChange: function(e){
        this.props.onChange(Object.assign({}, this.props.value, {description: e.target.value}));
    },
    onSubmit: function(e){
        e.preventDefault();
        this.refs.name.focus();
        this.props.onSubmit();
    },

    componentDidUpdate: function(prevProps){
        var value = this.props.value;
        var prevValue = prevProps.value;

        if (this.isMounted && value.errors && value.errors != prevValue.errors){
            if (value.errors.email){
                this.refs.email.focus();
            }
            else if (value.errors.name){
                this.refs.name.focus();
            }
        }
    },

    render: function(){
        var errors = this.props.value.errors || {};

        return(
            React.createElement('form', {onSubmit: this.onSubmit, className: 'ContactForm', noValidate: true},
                React.createElement('input',{
                    type: 'text',
                    className: errors.name && 'ContactForm-error',
                    placeholder: 'Name (required)',
                    value: this.props.value.name,
                    onChange: this.onNameChange,
                    ref: 'name',
                    autoFocus: true,
                }),
                React.createElement('input',{
                    type: 'email',
                    className: errors.email && 'ContactForm-error',
                    placeholder: 'Email(required)',
                    value: this.props.value.email,
                    onChange: this.onEmailChange,
                    ref: 'email',
                }),
                React.createElement('textarea',{
                    placeholder: 'Description',
                    value: this.props.value.description,
                    onChange: this.onDescriptionChange,
                }),
                React.createElement('button', {type: 'submit'}, "Add Contact")
            )
        )
    },
});

var ContactItem = React.createClass({
    propTypes: {
        name: React.PropTypes.string.isRequired,
        email: React.PropTypes.string.isRequired,
        description: React.PropTypes.string,
    },
    render: function(){
        return(
            React.createElement('li', {className:'ContactItem'},
                React.createElement('h2', {className:'ContactItem-name'}, this.props.name),
                React.createElement('a', {className:'ContactItem-email',href: 'mailto:'+this.props.email}, this.props.email),
                React.createElement('div', {className:'ContactItem-description'}, this.props.description)
            )
        )
    },
});

var ContactView = React.createClass({
    propTypes:{
        contacts: React.PropTypes.array.isRequired,
        newContact: React.PropTypes.object.isRequired,
        onNewContactChange: React.PropTypes.func.isRequired,
        onNewContactSubmit: React.PropTypes.func.isRequired,
    },
    render: function(){
        var contactItemElements = this.props.contacts
            .filter(function(contact) {return contact.email})
            .map(function(contact) {return React.createElement(ContactItem, contact)})
        return (
            React.createElement('div', {className: 'ContactView'},
                React.createElement('h1', {className: 'ContactView-title'}, "Contacts"),
                React.createElement('ul', {className: 'ContactView-list'}, contactItemElements),
                React.createElement(ContactForm, {
                    value: this.props.newContact,
                    onChange: this.props.onNewContactChange,
                    onSubmit: this.props.onNewContactSubmit,
                })
            )
        );
    },
});

var CONTACT_TEMPLATE = {name: "", email: "", description: "", errors: null};

function updateNewContact(contact){
    setState({ newContact: contact});
}

function submitNewContact(){
    var contact = Object.assign({}, state.newContact, {key: state.contacts.length + 1, errors: {}});

    if(!contact.name){
        contact.errors.name = ["Please enter your new contact's name"]
    }
    if (!/.+@.+\..+/.test(contact.email)){
        contact.errors.email = ["Please enter your contact's email"]
    }    
    setState(
        Object.keys(contact.errors).length === 0
        ? {
            newContact: Object.assign({}, CONTACT_TEMPLATE),
            contacts: state.contacts.slice(0).concat(contact),
        }
        : {newContact: contact}
    );
    
}

var state = {};

function setState(changes){
    Object.assign(state, changes);

    ReactDOM.render(
        React.createElement(ContactView, Object.assign({}, state, {
            onNewContactChange: updateNewContact,
            onNewContactSubmit: submitNewContact,
        })),
        document.getElementById('react-app')
    );
}

setState ({
    contacts: [
        {key: 1, name: "John C Benson", email: "jbenson@withum.com", description: "Just Another Developer"},
        {key: 2, name: "Roland Deschain", email: "rdeschain@katet.org", description: "Gunslinger"},
        {key: 3, name: "Bobby Tables"},
        {key: 4, name: "Isaac Asimov", email: "iasimov@trantor.gov", description: "One of the Big Three"}
    ],
    newContact: Object.assign({}, CONTACT_TEMPLATE),
});

