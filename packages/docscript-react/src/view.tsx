import { BaseReflection } from '@docscript/reflector/src/reflection'
import React from 'react'

export interface ReflectionViewProps<R extends BaseReflection> {
	reflection: R
	settings?: ViewSettings
}

export abstract class BaseView<
	R extends BaseReflection,
	P extends object = {}
> extends React.Component<ReflectionViewProps<R> & P> {}

export interface ViewSettings {
	nav?: boolean
	compact?: boolean
}

export const ViewContext = React.createContext<ViewSettings>({})

export function withContext<P extends { settings?: ViewSettings }>(
	Class: React.ComponentClass<P>
): any {
	return (props: P) => {
		return (
			<ViewContext.Consumer>
				{settings => {
					console.log('Settings', settings)
					return <Class {...props} settings={settings} />
				}}
			</ViewContext.Consumer>
		)
	}
}
