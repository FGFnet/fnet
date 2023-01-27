# Generated by Django 3.2.10 on 2023-01-27 12:28

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Schedule',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField()),
                ('day', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='LC',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('schedule', models.IntegerField()),
                ('name', models.CharField(max_length=10)),
                ('total', models.IntegerField()),
                ('fg_n_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='fg_n', to=settings.AUTH_USER_MODEL)),
                ('fg_s_id', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='fg_s', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'db_table': 'lc',
                'ordering': ['schedule', 'name'],
            },
        ),
    ]
