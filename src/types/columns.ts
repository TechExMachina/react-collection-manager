import { ReactNode } from 'react'

export type Column = {
  /**
   * The name of the column
   */
  name: string
  /**
   * The name of field in the collection. Must be an attributes of objects in entries
   */
  property: string
  /**
   * Function to override the render component of this column. Must return component
   *
   * **Signature:**
   *
   * - data : the row data
   */
  render?: (data: Record<string, string>) => ReactNode
}
