module.exports = function(generator) {

  var hb = generator.handlebars;
  var u = generator.util;

  hb.registerHelper('show-session', function(frame) {
    if (!(generator.req && generator.req.session)) return 'no-session';
    var data = u.assign({}, { sessionID:generator.req.sessionID }, generator.req.session );
    return u.htmlify(data);
  });

};
