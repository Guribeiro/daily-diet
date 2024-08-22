import { ReactNode } from "react";
import { TouchableOpacityProps, ActivityIndicator } from "react-native"
import styled, {css} from 'styled-components/native'

interface ButtonProps extends TouchableOpacityProps {
  variation?: 'filled' | 'outlined'
  icon?: ReactNode
  loading?: boolean
}

interface Variation {
  variation: 'filled' | 'outlined'
}

const Container = styled.TouchableOpacity<Variation>`
  padding: 16px;
  border-radius: 8px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.COLORS.GRAY_200};
  border: 1px solid ${({theme}) => theme.COLORS.GRAY_200};

  ${({variation}) => variationsStyles[variation].container}
`

const IconWrapper = styled.View`
  margin-right: 8px;
`

const Text = styled.Text<Variation>`
  font-size: ${({theme}) => theme.FONT_SIZE.MD}px;
  font-family: ${({theme}) => theme.FONT_FAMILY.BOLD};
  color: ${({ theme}) => theme.COLORS.WHITE};
  text-align: center;

  ${({variation}) => variationsStyles[variation].text}
`;

const variationsStyles = {
  filled: {
    container: css`
      background-color: ${({theme}) => theme.COLORS.GRAY_200};
    `,
    text: css`
      color: ${({theme}) => theme.COLORS.GRAY_700 };
    `
  },
  outlined: {
    container: css`
      background-color: ${({theme}) => theme.COLORS.GRAY_600};
    `,
     text: css`
     color: ${({theme}) => theme.COLORS.GRAY_200 };
   `
  }
}

export const Button = ({
    icon, 
    variation = 'filled',
    loading, 
    children,
    ...rest
  }:ButtonProps) => {
  return (
    <Container variation={variation} {...rest}>
      {icon && (
        <IconWrapper>
          {icon}
        </IconWrapper>
      )}
      {loading ? (
        <ActivityIndicator />
      ): (
      <Text variation={variation}>
        {children}
      </Text>
      )}
    </Container>
  )
}