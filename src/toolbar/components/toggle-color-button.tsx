import React from 'react';
import { TouchableWithoutFeedback, View, StyleSheet } from 'react-native';
import type { ToolbarTheme } from '../../types';
import { useToolbar } from './toolbar-context';

interface Props {
  valueOn: string | false;
  valueOff?: string | false;
  name: string;
}

export const ToggleColorButton: React.FC<Props> = ({
  name,
  valueOn,
  valueOff = false,
}) => {
  const { apply, isSelected, theme, styles } = useToolbar();
  const selected = isSelected(name, valueOn);
  const handlePress = () => apply(name, selected ? valueOff : valueOn);
  const defaultStyles = makeStyles(theme);
  const toolStyle = styles?.selection?.colorToggle?.tool
    ? styles.selection.colorToggle.tool(defaultStyles.tool)
    : defaultStyles.tool;
  const overlayStyle = styles?.selection?.colorToggle?.overlay
    ? styles.selection.colorToggle.overlay(defaultStyles.overlay)
    : defaultStyles.overlay;
  const noColorStyle = styles?.selection?.colorToggle?.noColor
    ? styles.selection.colorToggle.noColor(defaultStyles.noColor)
    : defaultStyles.noColor;

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View
        style={[
          toolStyle,
          {
            backgroundColor: valueOn !== false ? valueOn : theme.overlay,
          },
        ]}
      >
        {selected && <View style={overlayStyle} />}
        {valueOn === false && <View style={noColorStyle} />}
      </View>
    </TouchableWithoutFeedback>
  );
};

const makeStyles = (theme: ToolbarTheme) =>
  StyleSheet.create({
    overlay: {
      ...StyleSheet.absoluteFillObject,
      borderRadius: 3,
      borderWidth: 1,
      borderColor: theme.color,
    },
    tool: {
      borderRadius: 3,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: 4,
      marginLeft: 4,
      height: Math.round(theme.size - 2),
      width: Math.round(theme.size - 2),
    },
    noColor: {
      borderTopWidth: 1,
      backgroundColor: theme.overlay,
      borderColor: theme.color,
      width: '100%',
      transform: [{ rotate: '45deg' }],
    },
  });
