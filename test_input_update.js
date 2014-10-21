text = new Meteor.Collection("text")

if (Meteor.isClient) {
    Template.hello.helpers({
        greeting: function () {
            return text.findOne({_id: "123"})
        }
    });
    Template.hello.events({
        'keydown .keydown': function (evt, tpl) {
            console.log("here")
            text.update(this._id, {$set: {mytext: evt.currentTarget.value}})
        },
        'keyup .keyup': function (evt, tpl) {
            // template data, if any, is available in 'this'
            text.update(this._id, {$set: {mytext: evt.currentTarget.value}})
        },
        'keydpress .keydpress': function (evt, tpl) {
            // template data, if any, is available in 'this'
            console.log("keypress")
            text.update(this._id, {$set: {mytext: evt.currentTarget.value}})
        }
    });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        if (!text.findOne({_id: "123"}))
            text.insert({_id: "123", mytext: "new text"})
    });
}
