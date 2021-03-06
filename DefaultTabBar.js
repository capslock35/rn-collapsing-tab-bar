const React = require('react');
//const { ViewPropTypes } = ReactNative = require('react-native');
const createReactClass = require('create-react-class');

import {
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions
} from 'react-native';
const Button = require('./Button');
let window = Dimensions.get('window');
let height = window.height;
const DefaultTabBar =createReactClass({
  // propTypes: {
  //   goToPage: React.PropTypes.func,
  //   activeTab: React.PropTypes.number,
  //   tabs: React.PropTypes.array,
  //   backgroundColor: React.PropTypes.string,
  //   activeTextColor: React.PropTypes.string,
  //   inactiveTextColor: React.PropTypes.string,
  //   textStyle: Text.propTypes.style,
  //   tabStyle: ViewPropTypes.style,
  //   renderTab: React.PropTypes.func,
  //   underlineStyle: ViewPropTypes.style
  // },

  getDefaultProps() {
    return {
      activeTextColor: 'navy',
      inactiveTextColor: 'black',
      backgroundColor: null
    };
  },

  renderTabOption(name, page) {
  },

  renderTab(name, page, isTabActive, onPressHandler) {
    const { activeTextColor, inactiveTextColor, textStyle } = this.props;
    const textColor = isTabActive ? activeTextColor : inactiveTextColor;
    const fontWeight = isTabActive ? 'bold' : 'normal';
    return (<Button
      style={styles.flexOne}
      key={name}
      accessible
      accessibilityLabel={name}
      accessibilityTraits="button"
      onPress={() => onPressHandler(page)}>
      <View style={[styles.tab, this.props.tabStyle]}>
        <Text style={[{ color: textColor, fontWeight }, textStyle]} numberOfLines={1}>
          {name}
        </Text>
      </View>
    </Button>);
  },

  render() {
    const containerWidth = this.props.containerWidth;
    const numberOfTabs = this.props.tabs.length;
    const tabUnderlineStyle = {
      position: 'absolute',
      width: containerWidth / numberOfTabs,
      height: 4,
      backgroundColor: 'navy',
      bottom: 0
    };

    const left = this.props.scrollValue.interpolate({
      inputRange: [0, 1], outputRange: [0, containerWidth / numberOfTabs]
    });
    return (
      <View style={[styles.tabs, { backgroundColor: this.props.backgroundColor }, this.props.style]}>
        {this.props.tabs.map((name, page) => {
          const isTabActive = this.props.activeTab === page;
          const renderTab = this.props.renderTab || this.renderTab;
          return renderTab(name, page, isTabActive, this.props.goToPage);
        })}
        <Animated.View style={[tabUnderlineStyle, { left }, this.props.underlineStyle]} />
      </View>
    );
  }
});

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: height*0.005
  },
  flexOne: {
    flex: 1
  },
  tabs: {
    height: height*0.07,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderColor: '#ccc'
  }
});

module.exports = DefaultTabBar;
