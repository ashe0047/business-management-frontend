import { createTheme, alpha } from "@mui/material";

//utility functions
const getCssToken = (token) =>
	getComputedStyle(document.querySelector(":root")).getPropertyValue(token);

const stateLayeringBackground = (
	backgroundColor,
	stateLayerColor,
	stateLayerOpacity
) =>
	`${
		stateLayerColor && stateLayerOpacity
			? `linear-gradient(${alpha(
					stateLayerColor,
					stateLayerOpacity
			  )}, ${alpha(stateLayerColor, stateLayerOpacity)}),`
			: ""
	} linear-gradient(${backgroundColor}, ${backgroundColor})`;

//MD Theme Config
export const createMDTheme = (mode) => createTheme({
	palette: {
		background:{
			default: "121212"
		},
		mode: mode ? "dark" : "light",
		primary: {
			main: getCssToken("--md-ref-palette-primary40"),
			light: getCssToken("--md-sys-color-primary-container-light"),
			dark: getCssToken("--md-sys-color-on-primary-container-light"),
			contrastText: getCssToken("--md-sys-color-primary-container-light"),
		},
		secondary: {
			main: getCssToken("--md-ref-palette-secondary40"),
			light: getCssToken("--md-sys-color-secondary-container-light"),
			dark: getCssToken("--md-sys-color-on-secondary-container-light"),
			contrastText: getCssToken(
				"--md-sys-color-secondary-container-light"
			),
		},
		tertiary: {
			main: getCssToken("--md-ref-palette-tertiary40"),
			light: getCssToken("--md-sys-color-tertiary-container-light"),
			dark: getCssToken("--md-sys-color-on-tertiary-container-light"),
			contrastText: getCssToken(
				"--md-sys-color-tertiary-container-light"
			),
		},
		surface: {
			main: getCssToken("--md-sys-color-surface-light"),
			onSurface: getCssToken("--md-sys-color-on-surface-light"),
			surfaceVariant: getCssToken("--md-sys-color-surface-variant-light"),
			onSurfaceVariant: getCssToken(
				"--md-sys-color-on-surface-variant-light"
			),
			surfaceContainer: {
				highest: getCssToken(
					"--md-sys-color-surface-container-highest-light"
				),
				high: getCssToken(
					"--md-sys-color-surface-container-high-light"
				),
				main: getCssToken("--md-sys-color-surface-container-light"),
				low: getCssToken("--md-sys-color-surface-container-low-light"),
				lowest: getCssToken(
					"--md-sys-color-surface-container-lowest-light"
				),
			},
			bright: getCssToken(
				"--md-sys-color-surface-container-bright-light"
			),
			dim: getCssToken("--md-sys-color-surface-container-dim-light"),
		},
		outline: {
			main: getCssToken("--md-sys-color-outline-light"),
			outlineVariant: getCssToken("--md-sys-color-outline-variant-light"),
		},
	},
	shadows: [
		"none",
		getCssToken("--md-sys-elevation-level1"),
		getCssToken("--md-sys-elevation-level2"),
		getCssToken("--md-sys-elevation-level3"),
		getCssToken("--md-sys-elevation-level4"),
		getCssToken("--md-sys-elevation-level5"),
	],
	opacity: {
		hover: getCssToken("--md-sys-state-hover-state-layer-opacity"),
		pressed: getCssToken("--md-sys-state-pressed-state-layer-opacity"),
		focus: getCssToken("--md-sys-state-focus-state-layer-opacity"),
		dragged: getCssToken("--md-sys-state-dragged-state-layer-opacity"),
	},
	components: {
		MuiChip: {
			styleOverrides: {
				root: ({ ownerState, theme }) => ({
					...(ownerState.color === "tertiary" && {
						background: stateLayeringBackground(
							theme.palette.tertiary.light
						),
						color: theme.palette.tertiary.dark,
						"&:hover": {
							background: stateLayeringBackground(
								theme.palette.tertiary.light,
								theme.palette.tertiary.dark,
								theme.opacity.hover
							),
						},
					}),
				}),
				iconColorTertiary: ({ theme }) => ({
					color: theme.palette.tertiary.dark,
				}),
				deleteIconColorTertiary: ({ theme }) => ({
					color: theme.palette.tertiary.dark,
				}),
			},
		},
		MuiButton: {
			styleOverrides: {
				root: ({ ownerState, theme }) => ({
					...(ownerState.color === "tertiary" &&
						ownerState.variant === "text" && {
							"&:hover": {
								backgroundColor: alpha(
									theme.palette.tertiary.main,
									theme.opacity.hover
								),
							},
						}),
				}),
			},
		},
		MuiSwitch: {
			styleOverrides: {
				root: ({ ownerState, theme }) => ({
					padding: 8,
					"& .MuiSwitch-switchBase": {
						color: theme.palette.outline.main,
						"&.Mui-checked": {
							"&+.MuiSwitch-track": {
								backgroundColor: theme.palette.secondary.light,
								opacity: 1,
								border: "none",
							},
							color: theme.palette.secondary.dark,
							opacity: 1,
						},
					},
					"& .MuiSwitch-track": {
						border: "0.1rem solid",
						borderColor: theme.palette.outline.main,
						backgroundColor:
							theme.palette.surface.surfaceContainer.highest,
						borderRadius: 22 / 2,
						"&:before, &:after": {
							content: '""',
							position: "absolute",
							top: "50%",
							transform: "translateY(-50%)",
							width: 16,
							height: 16,
						},
					},
					"& .MuiSwitch-thumb": {
						boxShadow: "none",
						width: 16,
						height: 16,
						margin: 2,
					},
				}),
			},
			variants: [
				{
					props: { variant: "" },
				},
			],
		},
		MuiToggleButton: {
			defaultProps:{
				color: "primary",
			},
			styleOverrides: {
				root: ({ ownerState, theme }) => {
					const color = ["standard", "default"].includes(ownerState.color) ? "primary" : ownerState.color
					return {
						color: theme.palette.surface.onSurface,
						border: "0.1rem solid",
						borderColor: theme.palette.outline.main,
						zIndex: 2,
						borderRadius: "16px",
						padding: "0.25rem 1rem",
						"&.Mui-selected": {
							color: theme.palette[color].dark,
							backgroundColor: theme.palette[color].light,
							zIndex: 1,
							"&:hover": {
								color: theme.palette[color].dark,
								backgroundColor: stateLayeringBackground(
									theme.palette[color].dark,
									theme.palette[color].dark,
									theme.opacity.hover
								),
							},
						},
						"&:hover": {
							color: theme.palette.surface.onSurface,
							backgroundColor: alpha(
								theme.palette.surface.onSurface,
								theme.opacity.hover
							),
						},
					};
				},
			},
		},
	},
});
