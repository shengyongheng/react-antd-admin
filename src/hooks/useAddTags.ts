import { useEffect } from 'react'
import { addTags } from '@/store/tags/action'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
/**
 * @param title tag 名称
 */
export const useAddTags = (title?: string) => {
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    const { pathname } = location
    const tagLabel = title || document.title || ''
    dispatch(addTags({ path: pathname, label: tagLabel }))
  }, [location])
}
