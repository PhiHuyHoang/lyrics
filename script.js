const { Component, Children } = React;
const { Motion, spring, presets } = ReactMotion;

const LYRICS = ["Let me tell you how we love {1F4D6}", "So I'm gonna love you ", "Like I'm gonna lose you", "I'm gonna hold you", "Like I'm saying goodbye", "Wherever we're standing", "I won't take you for granted", "Cause we'll never know when", "When we'll run out of time", "So I'm gonna love you"].map(t => t.replace(/{(\w*)}/g, (_, val) => twemoji.convert.fromCodePoint(val))).map(t => twemoji.parse(t));

class Section extends Component {
  render() {
    const { children, active } = this.props;
    return (
      React.createElement(Motion, { defaultStyle: { s1: 0.8, s2: 0.7 }, style: { s1: active ? spring(1, presets.wobbly) : spring(0.8, presets.wobbly), s2: active ? spring(1, presets.wobbly) : spring(0.8, presets.wobbly) } },
      (interp) =>
      React.createElement("section", { className: "section" },
      React.createElement("span", { className: `text ${active ? ' active' : ''}`, style: { transform: `scale(${interp.s1}, ${interp.s2})` }, dangerouslySetInnerHTML: { __html: children } }))));




  }}


class Controller extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeArr: Children.map(this.props.children, c => false) };

    this.handleScroll = this.handleScroll.bind(this);
  }
  static inFocus(ref, window) {
    const rect = ReactDOM.findDOMNode(ref).getBoundingClientRect();
    const { top, bottom } = rect;
    const { innerHeight: height } = window;
    return top >= 0 && bottom <= height;
  }
  handleScroll(e) {
    let activeArr = Object.keys(this.refs).map(ref => Controller.inFocus(this.refs[ref], window));
    this.setState({ ...this.state, activeArr });
  }
  componentDidMount() {
    window.addEventListener('scroll', _.throttle(this.handleScroll, 60));
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', _.throttle(this.handleScroll, 60));
  }
  render() {
    const { activeArr } = this.state;
    const { children } = this.props;
    return (
      React.createElement("div", { className: "wrapper" },
      Children.map(children, (child, i) => React.cloneElement(child, { active: activeArr[i], ref: `ref${i}` }))));


  }}


const App = () =>
React.createElement(Controller, null,
LYRICS.map(l => React.createElement(Section, null, l)));



ReactDOM.render(React.createElement(App, null), document.body);