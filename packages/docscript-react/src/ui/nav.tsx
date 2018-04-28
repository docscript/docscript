import React from 'react'
import styled from 'styled-components'

const NavBlock = styled.div`
	display: flex;
	flex-direction: column;
`

export class NavSection extends React.Component<{ heading: React.ReactNode }> {
	render() {
		return (
			<NavSectionBlock>
				<NavSectionHeader>{this.props.heading}</NavSectionHeader>
				{this.props.children}
			</NavSectionBlock>
		)
	}
}

const NavSectionBlock = styled.div``

const NavSectionHeader = styled.div`
	text-transform: uppercase;
	color: #444;
	font-size: 14px;
	font-weight: bold;

	margin-bottom: 10px;
`

export class NavItem extends React.Component<{ href: string }> {
	render() {
		return <NavItemBlock href={this.props.href}>{this.props.children}</NavItemBlock>
	}
}

const NavItemBlock = styled.a`
	margin-bottom: 5px;
	display: block;
`

export interface NavProps {}

export class Nav extends React.Component<NavProps> {
	static Section = NavSection
	static Item = NavItem

	render() {
		return <NavBlock>{this.props.children}</NavBlock>
	}
}
