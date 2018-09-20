import React from 'react'
import { Join } from './ui/join'
import { TypeReflection } from '@tygen/reflector/src/reflection/_type/reflection'
import { TypePre } from './pre/type'
import { PrettyCode } from './pre/prettier'

export class TypeArgumentsPre extends PrettyCode<{ types: TypeReflection[] }> {
	render() {
		const { types } = this.props

		return (
			<React.Fragment>
				{'<'}
				<Join joinWith=",">
					{types.map((ty, i) => (
						<TypePre key={ty.id || `ty${i}`} reflection={ty} />
					))}
				</Join>
				{'>'}
			</React.Fragment>
		)
	}
}
