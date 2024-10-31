import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

import {
  Alert,
  AlertDescription,
  AlertTitle
} from '@/components/ui/alert'

export default function ErrorAlertModal () {
  return (
    <Alert variant='destructive' className="fixed w-80 top-0 right-0 mt-[107px] mr-4 lg:mr-8 xl:mr-16 z-50">
      <ExclamationTriangleIcon className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Account Id is incorrect
      </AlertDescription>
    </Alert>
  )
}
