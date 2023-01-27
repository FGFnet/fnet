# Generated by Django 3.2.10 on 2023-01-27 12:28

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('lc', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Freshman',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('phone_number', models.CharField(max_length=13, null=True)),
                ('register', models.BooleanField(default=False)),
                ('department', models.CharField(choices=[('NC', 'nat'), ('EN', 'eng'), ('SS', 'soc'), ('HS', 'hum')], max_length=10)),
                ('lc', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='lc.lc')),
            ],
        ),
    ]
