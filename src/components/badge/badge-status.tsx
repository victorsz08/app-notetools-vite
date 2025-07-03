import { CheckCircle, Clock, XCircle, type LucideIcon } from "lucide-react";

type Status = "PENDENTE" | "CANCELADO" | "CONECTADO";
const Status = {
  PENDENTE: "Pendente" as Status,
  CONECTADO: "Conectado" as Status,
  CANCELADO: "Cancelado" as Status,
} as const;
interface BadgeStatus {
  variant: Status;
}

const classesName = {
  PENDENTE: "bg-orange-100 text-orange-700",
  CONECTADO: "bg-green-100 text-green-700",
  CANCELADO: "bg-red-100 text-red-700",
} as const;

const iconBadge = {
  PENDENTE: Clock,
  CONECTADO: CheckCircle,
  CANCELADO: XCircle,
} as const;

export function BadgeStatus({ variant }: BadgeStatus) {
  const Icon: LucideIcon = iconBadge[variant];
  const classes = classesName[variant];
  const label = Status[variant];

  return (
    <div className={`${classes} flex items-center gap-1 justify-center`}>
      <span className="font-medium text-xs">{label}</span>
      <Icon className="w-3 h-3" />
    </div>
  );
}
