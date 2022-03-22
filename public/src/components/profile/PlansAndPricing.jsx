import React, {useContext} from 'react'
import { ProfileContext } from './ProfileRoot'

export default function PlansAndPricing() {
  const { currentProfile } = useContext(ProfileContext)
  return(
    <div className="pricing">
      <table>
        <thead>
          <tr>
            <th>Service</th>
            <th>Time Frame</th>
            <th>Price</th>
            <th>Add To Cart</th>
          </tr>
        </thead>
        <tbody>
        {Object.values(currentProfile.skills).map((row) => {
          return(
            <tr key={row.skill_id}>
              <td>{row.skill}</td>
              <td>30 Minutes</td>
              <td>{row.price}</td>
              <td><input type="checkbox" name={row.skill_id} />&nbsp;</td>
            </tr>
          )
        })}
        </tbody>
      </table>
      <button>Schedule</button>
    </div>
  )
}