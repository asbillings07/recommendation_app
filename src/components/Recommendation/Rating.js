import React, { useEffect, useCallback } from 'react'
import Star from './Star'
import { StarsIcon } from '../../elements'
import { notify } from 'react-notify-toast'
import { getUserRating, updateUserRating } from '../../Store/slices/ratingSlice'
import { useSelector, useDispatch } from 'react-redux'
import { useStateWithCallback } from '../../CustomHooks/useStateWithCallback'

export default function StarRating ({ recid }) {
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.users)
  const { ratingErrorStatus, ratingErrorMessage } = useSelector((state) => state.ratings)
  // Initialize a 'rating' state
  const [userRating, setUserRating] = useStateWithCallback(
    0,
    useCallback(
      (userRating) => {
        if (userRating > 0) {
          const rate = {
            rate: userRating
          }

          console.log('REC_ID', recid)
          dispatch(updateUserRating(token, rate, recid))
        }
      },
      [dispatch, recid, token]
    )
  )

  // const getUserRating = useCallback(async () => {
  //   console.log(authorizedUser.id)
  //   const res = await axios.get(`${Config.apiBaseUrl}/rating`, {
  //     headers: { Authorization: 'bearer ' + token }
  //   })
  //   console.log(res.data)
  //   return res.data
  // }, [authorizedUser, token])

  // const updateRating = (rating) => {
  //   console.log('INSIDE UPDATE RATING', rating)
  //   if (rating > 0) {
  //   }

  //   // if ((await getUserRating().length) > 0) {
  //   //   await axios.put(`${Config.apiBaseUrl}/rating/recs/${recid}`, data, {
  //   //     headers: { Authorization: 'bearer ' + token }
  //   //   })
  //   // }
  //   // await axios.post(`${Config.apiBaseUrl}/rating/recs/${recid}`, data, {
  //   //   headers: { Authorization: 'bearer ' + token }
  //   // })
  // }

  // event handler that updates the rating state.
  const handleSetRating = (rating) => {
    console.log('HANDLE RATING', rating)
    if (userRating === rating) {
      setUserRating(0)
    } else {
      setUserRating(rating)
    }
  }

  //function that returns 5 Star components

  const renderStars = () => {
    const maxStars = [0, 1, 2, 3, 4]
    return maxStars.map((star, i) => (
      <Star isSelected={userRating > i} setRating={() => handleSetRating(i + 1)} key={i} />
    ))
  }

  useEffect(() => {
    dispatch(getUserRating(token))
  }, [token, dispatch])

  useEffect(() => {
    // will need to clear rating for the user after they get the message
    if (ratingErrorStatus) {
      notify.show(ratingErrorMessage, 'error', 5000)
      setUserRating(0)
    }
  }, [ratingErrorStatus, ratingErrorMessage, setUserRating])

  // useEffect(() => {
  //   if (userRating > 0) {
  //     const rate = {
  //       rate: userRating
  //     }
  //     console.log('REC_ID', recid)
  //     //dispatch(updateUserRating(token, rate, recid))
  //   }
  //   return () => {
  //     dispatch(setUserRating(0))
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [userRating])

  // Pass the function to a Star component via props

  return <StarsIcon>{renderStars()}</StarsIcon>
}
