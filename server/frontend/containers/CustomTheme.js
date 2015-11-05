let Colors = require('material-ui/lib/styles/colors');
let ColorManipulator = require('material-ui/lib/utils/color-manipulator');
let Spacing = require('material-ui/lib/styles/spacing');

module.exports = {
  spacing: Spacing,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: Colors.blueGrey300,
    primary2Color: '#455A64',
    primary3Color: Colors.lightBlack,
    accent1Color: '#FF5722',
    accent2Color: Colors.grey100,
    accent3Color: Colors.grey500,
    textColor: Colors.darkBlack,
    alternateTextColor: Colors.grey100,
    canvasColor: Colors.white,
    borderColor: Colors.grey300,
    disabledColor: ColorManipulator.fade(Colors.grey300, 0.3),
  },
};
