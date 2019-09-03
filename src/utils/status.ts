enum IColor {
    primary = 'primary',
    default = 'default'
}

export const getColor = (state: string): IColor => state === 'running' ? IColor.primary : IColor.default;