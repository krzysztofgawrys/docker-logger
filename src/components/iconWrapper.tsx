import React from 'react';
import { Icon } from '@iconify/react';


interface IconProps {
    icon: object,
    className?: string
}

const IconWrapper: React.SFC<IconProps> = (props: IconProps) => {
    const { icon } = props;
    const size = 25;
    return (
        <Icon icon={icon} width={size} height={size} className={props.className || undefined} />
    )
};

export default IconWrapper;