import * as React from 'react'

import { Header } from './ui/header'
import { BaseView, withSettings } from './view'

import { InventoryReflection } from '@tygen/reflector/src/reflection/inventory/reflection'
import { css } from 'linaria'
import { hrefFromId } from './ref-link'
import { normalizePath } from './helpers'

@withSettings
export class InventoryPage extends BaseView<InventoryReflection> {
	render() {
		const { settings, reflection } = this.props
		const { nav } = settings!
		if (nav) {
			return null
		}

		return (
			<div>
				<Header pkg={'🏠'} />
				<div className={InventoryBody}>
					<table>
						<thead>
							<tr>
								<th>Package</th>
								<th>Description</th>
								<th>Version</th>
							</tr>
						</thead>
						<tbody>
							{reflection.packages.map(pkg => {
								const href = normalizePath(
									settings!,
									hrefFromId(`${pkg.name}->${pkg.versions[0]}`).href
								)

								return (
									<tr className={PackageRow} key={pkg.name}>
										<td>
											<a className={PackageRowName} href={href}>
												{pkg.name}
											</a>
										</td>
										<td>{pkg.description}</td>
										<td>{pkg.versions[0]}</td>
									</tr>
								)
							})}
						</tbody>
					</table>
				</div>
			</div>
		)
	}
}

const InventoryBody = css`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-top: var(--items-space);

	td {
		padding: 10px;
	}

	th {
		text-align: left;
		padding: 20px 0;
	}
`

const PackageRow = css`
	padding: 5px 10px;
	width: 400px;
	&:nth-child(even) {
		background-color: #f5f5f5;
	}
`
const PackageRowName = css`
	font-size: 14px;
	display: block;
`
