type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          avatarurl: string | null
          fullname: string | null
          id: string
          updated_at: string | null
          username: string | null
        }
        Insert: {
          avatarurl?: string | null
          fullname?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          avatarurl?: string | null
          fullname?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
