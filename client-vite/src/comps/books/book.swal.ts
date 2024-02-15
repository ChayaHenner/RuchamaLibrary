import Swal from 'sweetalert2'
import { patchDeleteBook } from '../../api/bookinstances'

export const swalBook = async (bookCode: number, name: string) => {
  Swal.fire({
    title: 'Are you sure?',
    text: `You want to delete book ${name}`,
    icon: 'question',
    confirmButtonText: 'confirm',
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await patchDeleteBook(bookCode)
        Swal.fire({
          title: 'Deleted!',
          text: ` book ${name}`,
          icon: 'success',
          confirmButtonText: 'confirm',
        }).then(() => {
          window.location.reload()
        })
      } catch {
        Swal.fire({
          title: "Can't Delete",
          text: 'Not all books are in Library',
          icon: 'warning',
        })
      }
    }
  })
}
