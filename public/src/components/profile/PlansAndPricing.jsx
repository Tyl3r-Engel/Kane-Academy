import React, {useContext} from 'react'
import { ProfileContext } from './ProfileRoot'

export default function PlansAndPricing() {
  const { currentProfile, loggedInUser, editable } = useContext(ProfileContext)
  if (currentProfile === undefined) {
    return (<div>There are currently no skills for this user.</div>)
  }
  if (currentProfile !== null && loggedInUser !== null) {
    if (currentProfile.id === loggedInUser.id && loggedInUser.mentor === false) {
      return (null)
    }
  }
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
            <tr key={Math.random() * 10000}>
              <td>{row.skill}</td>
              <td>30 Minutes</td>
              <td>{row.price}</td>
              <td><input type="checkbox" name={row.skill_id} />&nbsp;</td>
            </tr>
          )
        })}
        </tbody>
      </table>
    </div>
  )
}