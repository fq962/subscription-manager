export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      perfil: {
        Row: {
          id: string;
          nombre: string | null;
          avatar_url: string | null;
          moneda: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          nombre?: string | null;
          avatar_url?: string | null;
          moneda?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          nombre?: string | null;
          avatar_url?: string | null;
          moneda?: string;
          updated_at?: string;
        };
      };
      categoria: {
        Row: {
          id: number;
          nombre: string;
          icono: string | null;
          color: string | null;
        };
        Insert: {
          nombre: string;
          icono?: string | null;
          color?: string | null;
        };
        Update: {
          nombre?: string;
          icono?: string | null;
          color?: string | null;
        };
      };
      proveedor: {
        Row: {
          id: number;
          id_categoria: number | null;
          nombre: string;
          icono: string | null;
          color: string | null;
          url: string | null;
          created_at: string;
        };
        Insert: {
          id_categoria?: number | null;
          nombre: string;
          icono?: string | null;
          color?: string | null;
          url?: string | null;
          created_at?: string;
        };
        Update: {
          id_categoria?: number | null;
          nombre?: string;
          icono?: string | null;
          color?: string | null;
          url?: string | null;
        };
      };
      suscripcion: {
        Row: {
          id: string;
          id_usuario: string;
          id_proveedor: number;
          precio: number;
          tipo: "mensual" | "anual";
          dia_cobro: number;
          fecha_inicio: string;
          fecha_fin: string | null;
          activo: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          id_usuario: string;
          id_proveedor: number;
          precio: number;
          tipo: "mensual" | "anual";
          dia_cobro: number;
          fecha_inicio: string;
          fecha_fin?: string | null;
          activo?: boolean;
          created_at?: string;
        };
        Update: {
          precio?: number;
          tipo?: "mensual" | "anual";
          dia_cobro?: number;
          fecha_inicio?: string;
          fecha_fin?: string | null;
          activo?: boolean;
        };
      };
      gasto_mensual: {
        Row: {
          id: string;
          id_suscripcion: string;
          mes: number;
          anio: number;
          monto: number;
          fecha_cobro: string;
          pagado: boolean;
          notas: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          id_suscripcion: string;
          mes: number;
          anio: number;
          monto: number;
          fecha_cobro: string;
          pagado?: boolean;
          notas?: string | null;
          created_at?: string;
        };
        Update: {
          monto?: number;
          fecha_cobro?: string;
          pagado?: boolean;
          notas?: string | null;
        };
      };
    };
  };
}
