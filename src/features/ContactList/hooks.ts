import { useCallback, useEffect } from 'react'
import { getContactsMachine } from '../../machines/getContacts.machine'
import { useMachineTransition } from '../../simple-fsm'
import { useLazyGetContactsQuery } from '../../store/api'

type Props = {
  skip?: boolean
}
/* 
  Note! This hook was created to demonstrate the usage of a finite state machine. 
  Of course, it's not a real-world example, and I could use Redux Toolkit to get the request state.
*/
export const useContactList = ({ skip }: Props = {}) => {
  const [trigger, { data }] = useLazyGetContactsQuery()
  const transition = useMachineTransition(getContactsMachine)

  const fetchData = useCallback(async () => {
    try {
      transition('fetch')
      await trigger().unwrap()
      transition('resolve')
    } catch (error) {
      transition('reject')
    }
  }, [transition, trigger])

  useEffect(() => {
    if (skip) return
    fetchData()
  }, [fetchData, skip])

  const refetch = useCallback(async () => {
    try {
      transition('fetch')
      await trigger().unwrap()
      transition('resolve')
    } catch (error) {
      transition('reject')
    }
  }, [transition, trigger])

  return { data, refetch }
}
