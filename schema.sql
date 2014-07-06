drop table IF EXISTS orders;
drop table IF EXISTS equipments;
drop table IF EXISTS orderEquipment;
drop table IF EXISTS tickets;
drop table IF EXISTS orderTicket;
drop table IF EXISTS orderInsurance;
drop table IF EXISTS costs;
drop table IF EXISTS contacts;
drop table IF EXISTS orderNotes;
drop table IF EXISTS orderCompleted;
drop table IF EXISTS groups;
drop table IF EXISTS betausers;

create table betausers (
  uid char[20] primary key,
  email text
);


create table orders (
  o_id char[20] primary key,
  departDate char not null,
  returnDate char not null,
  campingPeople char[2] not null,
  isDiy char[1] not null
);

create table orderNotes (
  o_id char[20],
  note text
);

create table costs (
  o_id char[20] not null,
  equipmentTotal integer,
  ticketTotal integer,
  insurance integer,
  allTotal integer
);

create table contacts (
  o_id char[20],
  name text,
  tel text,
  email text,
  note text
);

create table equipments (
  e_id char[2] primary key,
  name char not null,
  price integer not null,
  chinese_name char
);

create table orderEquipment (
  o_id char[20] not null,
  e_id char[2] not null,
  quantity char[2],
  cost integer
);

create table tickets (
  t_id char[2] primary key,
  name char not null,
  price integer not null,
  chinese_name char
);

create table orderTicket (
  o_id char[20] not null,
  t_id char[2] not null,
  quantity char[2],
  cost integer
);

create table orderInsurance (
  o_id char[20] not null,
  quantity char[2],
  cost integer
);

create table orderCompleted (
  o_id char[20] not null,
  c char[1]
);

create table groups (
  o_id char[20] not null,
  name text,
  tel text,
  email text,
  note text
);

insert into equipments values(12,'tent2',40,'双人帐篷');
insert into equipments values(14,'tent4',60,'四人帐篷');
insert into equipments values(18,'tent8',100,'八人帐篷');
insert into equipments values(20,'pad',10,'防潮垫');
insert into equipments values(30,'sleepingbag',10,'睡袋');
insert into equipments values(40,'light',5,'帐篷灯');
insert into equipments values(50,'backbag',30,'登山包');
insert into equipments values(90,'combo',25,'露营套餐');
insert into tickets values(01,'la',30,'临安（烧烤）');
insert into tickets values(02,'qdh',50,'千岛湖（烧烤+篝火）');
insert into tickets values(03,'gqd',70,'枸杞岛（船票+烧烤）');
insert into tickets values(04,'nzj',50,'鸟之家（烧烤+篝火）');
insert into tickets values(00,'self',0,'自定地点');
