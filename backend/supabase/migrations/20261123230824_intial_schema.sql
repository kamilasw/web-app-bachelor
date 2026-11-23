create table public.clients (
    client_id uuid primary key
        references auth.users(id) on delete cascade,
    name text not null default ''
);

create table public.runs (
    run_id uuid primary key default gen_random_uuid(),
    client_id uuid not null
        references public.clients(client_id) on delete cascade,
    algorithm text not null,
    name text not null,
    filepath text,

    unique (run_id, client_id)
);

create table public.dashboards (
    dashboard_id uuid primary key default gen_random_uuid(),
    client_id uuid not null
        references public.clients(client_id) on delete cascade,
    name text not null,
    created_date timestamptz not null default now(),
    updated_date timestamptz not null default now(),
    grid_width integer not null check (grid_width > 0),
    grid_height integer not null check (grid_height > 0)
);

create table public.widgets (
    widget_id uuid primary key default gen_random_uuid(),
    client_id uuid not null
        references public.clients(client_id) on delete cascade,
    run_id uuid not null,
    name text not null,
    type text not null,
    x_label text,
    y_label text,

    foreign key (run_id, client_id)
        references public.runs(run_id, client_id)
        on delete cascade
);

create table public.dashboard_widgets (
    dashboard_id uuid not null
        references public.dashboards(dashboard_id) on delete cascade,
    widget_id uuid not null
        references public.widgets(widget_id) on delete cascade,
    grid_x integer not null check (grid_x >= 0),
    grid_y integer not null check (grid_y >= 0),

    primary key (dashboard_id, widget_id)
);

create index on public.runs(client_id);
create index on public.dashboards(client_id);
create index on public.widgets(client_id);
create index on public.widgets(run_id, client_id);
create index on public.dashboard_widgets(widget_id);

-- Row Level Security
alter table public.clients enable row level security;
alter table public.runs enable row level security;
alter table public.dashboards enable row level security;
alter table public.widgets enable row level security;
alter table public.dashboard_widgets enable row level security;