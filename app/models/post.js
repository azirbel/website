import DS from "ember-data";

var Post = DS.Model.extend({
  shortname: DS.attr('string'),
  title: DS.attr('string'),
  post_date: DS.attr('date'),
  updated_date: DS.attr('date'),
  body: DS.attr('string')
});

Post.reopenClass({
  FIXTURES: [
    {
      id: 1,
      shortname: 'first',
      title: 'First Post',
      body: 'Stuffs!'
    },
    {
      id: 2,
      shortname: 'second',
      title: 'Second Post',
      body: 'Second Stuffs!'
    }
  ]
});

export default Post;
